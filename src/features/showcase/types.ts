export interface Showcase {
  _id: string;
  tenantId: string;
  name: string;
  hash: string;
  banner: string | null;
  logo: string | null;
  presentation: {
    title: string;
    image: string | null;
    sections: {
      title: string;
      description: string;
    }[];
  };
  body: {
    title: string;
    image: string | null;
    section: {
      title: string;
      description: string;
    };
  };
}

export interface ShowcaseState {
  data: Showcase | null;
  loading: boolean;
  error: string | null;
  message?: string;
}

export interface CreateShowcasePayload {
  name: string;
  banner: File | null;
  logo: File | null;
  presentation: {
    title: string;
    image: File | null;
    sections: {
      title: string;
      description: string;
    }[];
  };
  body: {
    title: string;
    image: File | null;
    section: {
      title: string;
      description: string;
    };
  };
}
