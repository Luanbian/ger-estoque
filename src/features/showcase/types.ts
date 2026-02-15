export interface Showcase {
  _id: string;
  tenantId: string;
  domain: string;
  name: string;
  hash: string;
  banner: string | null;
  logo: string | null;
  showName: boolean;
  showStories: boolean;
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
  testimonials: {
    title: string;
    sections: {
      title: string;
      description: string;
    }[];
  };
  stories?: {
    title: string;
    thumbnail: string;
    items: {
      title: string;
      subtitle: string;
      profileImage: string;
      image: string;
    }[];
  }[];
}

export interface ShowcaseState {
  data: Showcase | null;
  loading: boolean;
  error: string | null;
  message?: string;
}

export interface CreateShowcasePayload {
  domain: string;
  name: string;
  banner: File | null;
  logo: File | null;
  showName: boolean;
  showStories: boolean;
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
  testimonials: {
    title: string;
    sections: {
      title: string;
      description: string;
    }[];
  };
  stories?: {
    title: string;
    thumbnail: File | null;
    items: {
      title: string;
      subtitle: string;
      profileImage: string;
      image: File | null;
    }[];
  }[];
}
