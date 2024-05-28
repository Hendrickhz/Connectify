import { create } from "zustand";
import supabase from "../config/supabaseClient";

export const useContactsStore = create((set, get) => ({
  contacts: [],
  contact: {},
  totalCount: 0,
  loading: false,
  error: null,

  fetchContacts: async (limit, offset, userId) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("user_id", userId)
      .order("first_name", { ascending: true })
      .range(offset, offset + limit - 1)
      .is("deleted_at", null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data, contact: {} });
    }
  },
  fetchContactById: async (contactId, userId) => {
    set({ loading: true, error: null, contact: {} });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .eq("user_id", userId)
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
  fetchFavorites: async (userId) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("is_favorite", true)
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data, contact: {} });
    }
  },
  fetchTrashes: async (userId) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("user_id", userId)
      .not("deleted_at", "is", null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data, contact: {} });
    }
  },
  fetchTotalCount: async (userId) => {
    const { count, error } = await supabase
      .from("contacts")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (!error) {
      set({ totalCount: count });
    }
  },

  toggleFavorite: async (contactId, userId, isFavoritesView = false) => {
    const contact = get().contacts.find((contact) => contact.id === contactId);
    const updatedContact = { ...contact, is_favorite: !contact.is_favorite };

    const { error } = await supabase
      .from("contacts")
      .update({ is_favorite: updatedContact.is_favorite })
      .eq("user_id", userId)
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

  toggleFavoriteById: async (contactId, userId) => {
    const contact = get().contact;
    if (!contact || contact.id !== contactId) {
      set({ error: "Contact not found" });
      return;
    }
    const updatedContact = { ...contact, is_favorite: !contact.is_favorite };

    const { error } = await supabase
      .from("contacts")
      .update({ is_favorite: updatedContact.is_favorite })
      .eq("user_id", userId)
      .eq("id", contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set({ contact: updatedContact });
    }
  },

  softDeleteContact: async (contactId, userId) => {
    const { error } = await supabase
      .from("contacts")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", userId)
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

  deleteContact: async (contactId, userId) => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("user_id", userId)
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
  emptyTrash: async (userId) => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("user_id", userId)
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

  restoreContact: async (contactId, userId) => {
    const { error } = await supabase
      .from("contacts")
      .update({ deleted_at: null })
      .eq("user_id", userId)
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
  restoreAllContacts: async (userId) => {
    const { error } = await supabase
      .from("contacts")
      .update({ deleted_at: null })
      .eq("user_id", userId);

    if (error) {
      set({ error: error.message });
    } else {
      set((state) => {
        return {
          contact: {},
          contacts: [],
        };
      });
      get().fetchTotalCount();
    }
  },

  logoutStore: () => {
    set({
      contacts: [],
      contact: {},
      totalCount: 0,
      loading: false,
      error: null,
    });
  },
}));
