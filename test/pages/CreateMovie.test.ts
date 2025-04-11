import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import CreateMovie from "../../src/pages/CreateMovie.vue";
import { createTestingPinia } from "@pinia/testing";
import { useMovieStore } from "../../src/store/useMovieStore";

// Mock des composants
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Composants d'entrée personnalisés
vi.mock("../../src/components/inputs/CustomInputtext.vue", () => ({
  default: {
    name: "CustomInputtext",
    template:
      '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ["modelValue", "label", "name", "id"],
  },
}));

vi.mock("../../src/components/inputs/CustomInputNumber.vue", () => ({
  default: {
    name: "CustomInputNumber",
    template:
      '<input type="number" :value="modelValue" @input="$emit(\'update:modelValue\', Number($event.target.value))" />',
    props: ["modelValue", "label", "name", "id"],
  },
}));

describe("CreateMovie", () => {
  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("devrait initialiser le formulaire avec des valeurs vides", () => {
    const wrapper = mount(CreateMovie, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          Button: {
            template: "<button><slot /></button>",
          },
        },
      },
    });

    // Vérifie que le titre est affiché
    expect(wrapper.find("h1").text()).toBe("Create Movie");

    // Vérifie les valeurs initiales du formulaire
    const form = wrapper.find("form");
    expect(form.exists()).toBe(true);
  });

  it("devrait appeler addMovie du store lors de la soumission du formulaire", async () => {
    const wrapper = mount(CreateMovie, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          Button: {
            template: "<button><slot /></button>",
          },
        },
      },
    });

    // Récupère le store
    const movieStore = useMovieStore();
    // Mock la réponse de addMovie
    vi.mocked(movieStore.addMovie).mockResolvedValue({
      _id: "1",
      title: "Nouveau Film",
      director: "Réalisateur",
      notation: 5,
    });

    // Remplit le formulaire
    const inputs = wrapper.findAll("input");
    await inputs[0].setValue("Nouveau Film");
    await inputs[1].setValue("Réalisateur");
    await inputs[2].setValue(5);

    // Soumet le formulaire
    await wrapper.find("form").trigger("submit");

    // Vérifie que addMovie a été appelé avec les bonnes valeurs
    expect(movieStore.addMovie).toHaveBeenCalledWith({
      title: "Nouveau Film",
      director: "Réalisateur",
      notation: 5,
    });

    // Attendre que toutes les promesses soient résolues
    await flushPromises();

    // Vérifie que la navigation a eu lieu
    const router = vi.mocked(useRouter());
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ name: "ListMovies" })
    );
  });
});
