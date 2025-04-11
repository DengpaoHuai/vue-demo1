import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createMovie,
  getMovies,
  deleteMovie,
  getMovieById,
} from "../../src/services/movie.servicfetch";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Movie Service Fetch", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("createMovie", () => {
    it("devrait appeler fetch avec les bons paramètres et retourner les données", async () => {
      const mockMovie = {
        title: "Test Movie",
        director: "Test Director",
        notation: 5,
      };
      const mockResponseData = { _id: "123", ...mockMovie };

      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockResponseData),
      });

      const result = await createMovie(mockMovie);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/movies"),
        {
          method: "POST",
          body: JSON.stringify(mockMovie),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      expect(result).toEqual(mockResponseData);
    });
  });

  describe("getMovies", () => {
    it("devrait appeler fetch et retourner les données", async () => {
      const mockMovies = [
        { _id: "1", title: "Movie 1", director: "Director 1", notation: 4 },
        { _id: "2", title: "Movie 2", director: "Director 2", notation: 5 },
      ];

      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockMovies),
      });

      const result = await getMovies();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/movies")
      );
      expect(result).toEqual(mockMovies);
    });
  });

  describe("deleteMovie", () => {
    it("devrait appeler fetch avec l'ID correct et la méthode DELETE", async () => {
      const mockId = "123";
      const mockResponse = { status: 200 };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await deleteMovie(mockId);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/movies/${mockId}`),
        {
          method: "DELETE",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMovieById", () => {
    it("devrait appeler fetch avec l'ID correct et retourner les données", async () => {
      const mockId = "123";
      const mockMovie = {
        _id: mockId,
        title: "Test Movie",
        director: "Test Director",
        notation: 5,
      };

      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockMovie),
      });

      const result = await getMovieById(mockId);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/movies/${mockId}`)
      );
      expect(result).toEqual(mockMovie);
    });
  });
});
