// api/SearchAPi.ts
import api from "./api";

export interface SearchNaver {
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
  try {
    const response = await api.get<SearchNaverResponse>("/search/naver", {
      params: {
        query,
      },
    });

    if (response.status !== 200) {
      console.error("API 요청 실패:", response.status);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return null;
  }
};
