import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import DisplayMovie from "../../src/pages/DisplayMovie.vue";
import { createTestingPinia } from "@pinia/testing";
import { useMovieStore } from "../../src/store/useMovieStore";

// Mock des composants
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      identifiant: "1",
    },
  }),
}));

describe("DisplayMovie", () => {
  const mockMovie = {
    _id: "1",
    title: "Film de Test",
    director: "Réalisateur Test",
    notation: 4.5,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("devrait afficher les détails du film", async () => {
    const wrapper = mount(DisplayMovie, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              movie: {
                currentMovie: mockMovie,
              },
            },
          }),
        ],
      },
    });

    // Vérifie que le titre est affiché
    expect(wrapper.find("h1").text()).toBe("Display Movie");

    // Vérifie que les détails du film sont affichés
    const content = wrapper.text();
    expect(content).toContain(mockMovie.title);
    expect(content).toContain(mockMovie.director);
    expect(content).toContain(mockMovie.notation.toString());
  });

  it("devrait appeler fetchMovie avec le bon ID lors du montage", async () => {
    const wrapper = mount(DisplayMovie, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    // Récupère le store
    const movieStore = useMovieStore();

    // Vérifie que fetchMovie a été appelé avec le bon ID
    expect(movieStore.fetchMovie).toHaveBeenCalledWith("1");
  });
});
