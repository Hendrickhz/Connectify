import { create } from "zustand";
import supabase from "../config/supabaseClient";

export const useContactsStore = create((set, get) => ({
  contacts: [],
  // favorites: [],
  contact: {},
  totalCount: 0,
  loading: false,
  error: null,

  fetchContacts: async (limit, offset) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("first_name", { ascending: true })
      .range(offset, offset + limit - 1)
      .is("deleted_at", null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data });
    }
  },
  fetchContactById: async (contactId) => {
    set({ loading: true, error: null, contact: {} });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set((state) => ({
        loading: false,
        contact: data,
      }));
    }
  },
  fetchFavorites: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("is_favorite", true)
      .is("deleted_at", null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data });
    }
  },
  fetchTrashes: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .not("deleted_at", "is", null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data });
    }
  },
  fetchTotalCount: async () => {
    const { count, error } = await supabase
      .from("contacts")
      .select("*", { count: "exact" })
      .is("deleted_at", null);

    if (!error) {
      set({ totalCount: count });
    }
  },
  updateContact: async (updatedContact) => {
    const { error } = await supabase
      .from("contacts")
      .update(updatedContact)
      .eq("id", updatedContact.id);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        ),
      }));
    }
  },

  toggleFavorite: async (contactId, isFavoritesView = false) => {
    const contact = get().contacts.find((contact) => contact.id === contactId);
    const updatedContact = { ...contact, is_favorite: !contact.is_favorite };

    const { error } = await supabase
      .from("contacts")
      .update({ is_favorite: updatedContact.is_favorite })
      .eq("id", contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        contacts: updatedContact.is_favorite
          ? state.contacts.map((contact) =>
              contact.id === contactId ? updatedContact : contact
            )
          : isFavoritesView
          ? state.contacts.filter((contact) => contact.id !== contactId)
          : state.contacts.map((contact) =>
              contact.id === contactId ? updatedContact : contact
            ),
      }));
    }
  },

  toggleFavoriteById: async (contactId) => {
    const contact = get().contact;
    if (!contact || contact.id !== contactId) {
      set({ error: "Contact not found" });
      return;
    }
    const updatedContact = { ...contact, is_favorite: !contact.is_favorite };

    const { error } = await supabase
      .from("contacts")
      .update({ is_favorite: updatedContact.is_favorite })
      .eq("id", contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set({ contact: updatedContact });
    }
  },

  softDeleteContact: async (contactId) => {
    const { error } = await supabase
      .from("contacts")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact.id !== contactId),
      }));
      get().fetchTotalCount();
    }
  },

  deleteContact: async (contactId) => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact.id !== contactId),
        contact: {},
      }));
    }
  },
  deleteTrash: async () => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .not("deleted_at", "is", null);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        contacts: [],
        contact: {},
      }));
      get().fetchTrashes();
    }
  },

  restoreContact: async (contactId) => {
    const { error } = await supabase
      .from("contacts")
      .update({ deleted_at: null })
      .eq("id", contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => {
        const updatedContact = { ...state.contact, deleted_at: null };
        return {
          contact: updatedContact,
          contacts: state.contacts.filter(
            (contact) => contact.id !== contactId
          ),
        };
      });
      get().fetchTotalCount();
    }
  },
  emptyTrash: async () => {
    const { data, error } = await supabase
      .from("contacts")
      .update({ deleted_at: null })
      .not("deleted_at", "is", null);
  
    if (error) {
      set({ error: error.message });
    } else {
      set((state) => ({
        contacts: state.contacts.map(contact =>
          contact.deleted_at !== null ? { ...contact, deleted_at: null } : contact
        )
      }));
      get().fetchTotalCount();
      get().fetchTrashes();
    }
  },
  
}));
