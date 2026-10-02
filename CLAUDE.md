# ger-estoque

Frontend desktop (Tauri 2.11 + React 19 + TS + MUI 7) de gestão de estoque/PDV. Consome a API NestJS do repo irmão `../ger-estoque-api` (prefixo global `/api`). Textos de UI em pt-BR, identificadores em inglês.

Escopo do "PDV": apenas registrar venda. Não há leitor de código de barras, impressora, gaveta, balança nem modo offline, e não estão planejados.

## Comandos

- Dev: `npm run tauri dev` (Vite fixo na porta 1420). `npm run dev` sozinho no navegador NÃO funciona: `appStore.init()` exige o runtime Tauri e todo HTTP passa por `@tauri-apps/plugin-http`.
- Typecheck: `npx tsc` (o `tsconfig` já tem `noEmit`). É a única checagem que existe: não há testes, ESLint nem Prettier.
- Build web: `npm run build` (`tsc && vite build`).
- Pacote oficial: MSI para Windows, `npm run tauri build -- --bundles msi`. O `"deb"` em `tauri.conf.json` não é o alvo oficial.
- CI (`.github/workflows/release.yml`): só na `main` (intencional). Gera o MSI como artifact do workflow, sem release, assinatura ou auto-update.
- O hook de pre-commit do husky roda `npm version patch` e faz stage do `package.json`: todo commit sobe a versão. Não reverta essa mudança.

## Divisão Rust / React

- `src-tauri/src/lib.rs`: só registra plugins (`store`, `opener`, `http`, `shell`). Não há `#[tauri::command]` nem `invoke()` no front.
- `src-tauri/capabilities/default.json`: `core`, `opener`, `store`, `http`. Não há permissão `shell:*`.
- `src/services/api.ts`: instância axios com `tauriFetchAdapter` (fetch do plugin-http; a URL é montada com `axios.getUri`, então `params` vira query string), refresh proativo/reativo com fila. Use `apiService.get/post/put/patch/delete`, que devolve o envelope `APIResponse<T>` (`src/features/common/types.ts`).
- `src/services/storage.ts` + `token.ts`: access token persistido em `storage.json` (plugin-store). `main.tsx` hidrata `auth` no Redux no boot (login persistente, `tenantId` = `sub` do JWT).
- `src/services/refreshToken.ts`: o refresh TEM que usar o `fetch` do plugin-http. O cookie httpOnly `refresh_token` fica no cookie jar do Rust e o XHR/fetch do webview não o enxerga.
- Logout = action `auth/logout`. A `logoutSaga` limpa `storage.json` e desconecta o WS.
- `src/constants/api.ts`: `loadConfig()` busca `https://luanbian.github.io/ger-estoque-config/data.json` no boot e sobrescreve `API_BASE_URL`/`WS_BASE_URL`/`ASSETS_BASE_URL`. As envs `VITE_PUBLIC_*` são só fallback.
- `src/services/socket.ts` + `features/ws`: socket.io no webview, evento `notification` (pedidos novos da vitrine).
- Para abrir URL externa use `openUrl` de `@tauri-apps/plugin-opener` (ver `utils/openWhatsapp.ts`).

## Convenções para código novo

- Domínio em `src/features/<dominio>/{slice,sagas,types,index}.ts`. A slice tem reducers `xRequest` vazios (gatilhos de saga) e setters (`setLoading`, `setError`, `setX`). O `index.ts` reexporta `actions` e `<dominio>Sagas`. Registre o reducer e o `spawn` da saga em `src/store/index.ts`.
- URLs nas sagas: sempre `` `${API_BASE_URL}/recurso` `` importando de `src/constants/api`. Algumas sagas antigas ainda usam caminho relativo; não copie esse padrão.
- Saga: `setLoading(true)` → `call(apiService.x, ...)` → `put(setX(data))` → `catch` com `setError(error instanceof Error ? error.message : "An unknown error occurred")` → `finally setLoading(false)`.
- Listagem: a saga lê os filtros com `select(state => state.filter.<x>)`, faz POST `/<x>/list` com os filtros no body e manda `generateParams(...)` como `params` (paginação). Os filtros ficam na slice global `features/filters`.
- Container/apresentação: o export público lê o Redux com `useDispatch`/`useSelector` de `src/store/hooks` e renderiza um `XComponent` interno com props `{ data: {...}, actions: {...} }`. Páginas: `app/pages/<Nome>/layout.tsx` (container) + `page.tsx` (apresentação). Componentes: os dois no mesmo arquivo.
- O "cache" é a própria slice: o container despacha o request no `useEffect` quando `data === null`. Não há React Query nem RTK Query.
- Os tipos da API são escritos à mão em `features/<x>/types.ts`, e os enums ficam em `features/common`. Não há codegen.
- Dinheiro: preços de produto, venda, pedido e plano são inteiros em centavos. Converta com `utils/convertTocents.ts`. Exceção: o endpoint de finanças já devolve reais, então exiba com `formatCurrency` sem dividir.
- Estoque: a regra é 100% da API, e estoque negativo é permitido (regra de negócio). Não bloqueie no front.
- Formulários: `react-hook-form` com `register` e regras inline. Não há biblioteca de schema.
- Feature por plano: envolva a rota com `RequireFeature` (`src/routes/RequiredFeatures.tsx`). As features vêm do claim `features` do JWT.
- Imports relativos sem extensão (`.ts` explícito é exceção em ~11 arquivos).

## Intencional (não "corrigir")

- `http:allow-fetch` com `https://**` e `devtools` em release: deixados assim de propósito para teste.
- Código não usado (`src/app/page.tsx`, `src/utils/theme.ts`, `src/constants/env.ts`, `formatPrice`): manter.

## Armadilhas

- O adapter faz `JSON.stringify` do body e ignora o `timeout` do axios.
- API local em `http://` é bloqueada pelo escopo `http:allow-fetch` (só `https://**`) e pela CSP. Além disso, `loadConfig()` sobrescreve as envs se o GitHub Pages responder.
- `plugin-shell` `open()` (em `registerAccount/container.tsx`) não tem permissão em capabilities.
- Erros das sagas de domínio vão para `slice.error` e nenhuma tela exibe (só auth/registro/planos). Os modais de criação fecham logo após o dispatch.
- No logout, as slices de domínio mantêm os dados do usuário anterior até o próximo fetch.
- `convertToCents` usa `parseFloat`: `"10,50"` vira 1000 centavos.
- Rotas com nome trocado: `/sale` renderiza `pages/Order` (pedidos da vitrine, "Nova Venda" no menu), e `/sales` renderiza `pages/Sales` (vendas, onde fica o modal que cria venda).

## Git

Conventional commits (`feat:`, `fix:`, `chore:`, `style:`, `hotfix:`). Branches: `main` e `development`.
