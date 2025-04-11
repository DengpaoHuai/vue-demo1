import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ListMovies from "../../src/pages/ListMovies.vue";
import { createTestingPinia } from "@pinia/testing";
import { useMovieStore } from "../../src/store/useMovieStore";

// Mock des composants Vue Router et PrimeVue
vi.mock("vue-router", () => ({
  RouterLink: {
    name: "RouterLink",
    template: "<a><slot /></a>",
  },
}));

vi.mock("primevue", () => ({
  DataTable: {
    name: "DataTable",
    template: '<div class="p-datatable"><slot /></div>',
  },
  Column: {
    name: "Column",
    template: '<div class="p-column"><slot /></div>',
  },
}));

describe("ListMovies", () => {
  const mockMovies = [
    { _id: "1", title: "Film 1", director: "Réalisateur 1", notation: 4 },
    { _id: "2", title: "Film 2", director: "Réalisateur 2", notation: 5 },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("devrait afficher la liste des films", async () => {
    const wrapper = mount(ListMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              movie: {
                movies: mockMovies,
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
          DataTable: true,
          Column: true,
        },
      },
    });

    // Vérifie que le titre est affiché
    expect(wrapper.find("h1").text()).toBe("List Movies");

    // Vérifie que chaque film est affiché dans la liste
    const listItems = wrapper.findAll("li");
    expect(listItems.length).toBe(mockMovies.length);

    // Vérifie que les titres sont corrects
    expect(listItems[0].text()).toContain("Film 1");
    expect(listItems[1].text()).toContain("Film 2");
  });

  it("devrait appeler deleteItem lors du clic sur le bouton supprimer", async () => {
    const wrapper = mount(ListMovies, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              movie: {
                movies: mockMovies,
              },
            },
          }),
        ],
        stubs: {
          RouterLink: true,
          DataTable: true,
          Column: true,
        },
      },
    });

    // Récupère le store
    const movieStore = useMovieStore();

    // Simule un clic sur le bouton supprimer du premier film
    await wrapper.findAll("button")[0].trigger("click");

    // Vérifie que la méthode deleteItem a été appelée avec le bon id
    expect(movieStore.deleteItem).toHaveBeenCalledWith("1");
  });
});
