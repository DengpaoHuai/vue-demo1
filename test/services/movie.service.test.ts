import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
} from "../../src/services/movie.service";
import httpClient from "../../src/lib/http-client";

vi.mock("../../src/lib/http-client", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Movie Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("createMovie", () => {
    it("devrait appeler httpClient.post avec les bons paramètres et retourner les données", async () => {
      const mockMovie = {
        title: "Test Movie",
        director: "Test Director",
        notation: 5,
      };
      const mockResponse = { data: { _id: "123", ...mockMovie } };

      vi.mocked(httpClient.post).mockResolvedValue(mockResponse);

      const result = await createMovie(mockMovie);

      expect(httpClient.post).toHaveBeenCalledWith("/", mockMovie);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getMovies", () => {
    it("devrait appeler httpClient.get et retourner les données", async () => {
      const mockMovies = [
        { _id: "1", title: "Movie 1", director: "Director 1", notation: 4 },
        { _id: "2", title: "Movie 2", director: "Director 2", notation: 5 },
      ];
      const mockResponse = { data: mockMovies };

      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await getMovies();

      expect(httpClient.get).toHaveBeenCalledWith("/");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("deleteMovie", () => {
    it("devrait appeler httpClient.delete avec l'ID correct et retourner la réponse", async () => {
      const mockId = "123";
      const mockResponse = { status: 200 };

      vi.mocked(httpClient.delete).mockResolvedValue(mockResponse);

      const result = await deleteMovie(mockId);

      expect(httpClient.delete).toHaveBeenCalledWith(`/${mockId}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMovieById", () => {
    it("devrait appeler httpClient.get avec l'ID correct et retourner les données", async () => {
      const mockId = "123";
      const mockMovie = {
        _id: mockId,
        title: "Test Movie",
        director: "Test Director",
        notation: 5,
      };
      const mockResponse = { data: mockMovie };

      vi.mocked(httpClient.get).mockResolvedValue(mockResponse);

      const result = await getMovieById(mockId);

      expect(httpClient.get).toHaveBeenCalledWith(`/${mockId}`);
      expect(result).toEqual(mockResponse.data);
    });
  });
});
