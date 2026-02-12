import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CircularProgress, Grid } from "@mui/material";
import { actions } from "../../features/showcase/slice";
import { useDispatch, useSelector } from "../../store/hooks";
import { API_BASE_URL } from "../../constants/api";
import { toast } from "react-toastify";

interface DomainContextType {
  subdomain: string | null;
  isValidSubdomain: boolean | null;
  hasSubdomainError: string | null;
  redirectToRoot: () => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

interface DomainProviderProps {
  children: ReactNode;
}

export const DomainProvider = ({ children }: DomainProviderProps) => {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isValidSubdomain, setIsValidSubdomain] = useState<boolean | null>(
    null,
  );
  const [hasSubdomainError, setHasSubdomainError] = useState<string | null>(
    null,
  );
  const [isReady, setIsReady] = useState<boolean>(false);

  const dispatch = useDispatch();
  const currentDomain = useSelector((state) => state.showcase.data);

  const generateHash = async (value: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const redirectToRoot = () => {
    const hostnameParts = window.location.hostname.split(".");
    const newHostname = hostnameParts.slice(1).join(".");
    const port = window.location.port ? `:${window.location.port}` : "";
    window.location.href = `${window.location.protocol}//${newHostname}${port}${window.location.pathname}${window.location.search}`;
  };

  const validateSubdomain = async (subdomainCheck: string) => {
    try {
      const hash = await generateHash(subdomainCheck);

      const response = await fetch(`${API_BASE_URL}/showcase/validate/${hash}`);
      if (response.ok) {
        dispatch(actions.getShowcaseByName({ name: subdomainCheck }));
        setIsValidSubdomain(true);
      } else {
        toast.error("Invalid subdomain!");
        redirectToRoot();
        setIsValidSubdomain(null);
      }
    } catch (error) {
      setIsValidSubdomain(null);
      redirectToRoot();
      setHasSubdomainError(error as string);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split(".");
    const subdomainX = parts[0];
    const isLocalhost = host.includes("localhost");

    if (isLocalhost ? parts.length > 1 : parts.length > 3) {
      if (subdomainX && subdomainX !== "www") {
        setSubdomain(subdomainX);
        validateSubdomain(subdomainX);
      } else {
        setSubdomain(null);
        setIsValidSubdomain(null);
        setIsReady(true);
      }
    } else {
      setSubdomain(null);
      setIsValidSubdomain(null);
      setIsReady(true);
    }
  }, []);

  if (!isReady || (!currentDomain?._id && isValidSubdomain)) {
    return (
      <Grid
        height="90vh"
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <DomainContext.Provider
      value={{ subdomain, isValidSubdomain, hasSubdomainError, redirectToRoot }}
    >
      {children}
    </DomainContext.Provider>
  );
};

export const useDomainContext = (): DomainContextType => {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error("useDomainContext must be used within a DomainProvider");
  }
  return context;
};
