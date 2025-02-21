import api from "./api";

interface SearchNaver {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

export interface SearchNaverResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchNaver[];
}

export const searchNaver = async (
  query: string,
): Promise<SearchNaverResponse | null> => {
  if (!query) {
    return null;
  }
  const response = await api.get("/search/naver", {
    params: {
      query,
    },
  });

  return response.data;
};
