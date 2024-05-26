import {create} from 'zustand';
import supabase from '../config/supabaseClient';


export const useContactsStore = create((set,get) => ({
  contacts: [],
  loading: false,
  error: null,
  
  fetchContacts: async (limit, offset) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .range(offset, offset + limit - 1)
      .is('deleted_at', null);

    if (error) {
      set({ loading: false, error: error.message });
    } else {
      set({ loading: false, contacts: data });
    }
  },

  updateContact: async (updatedContact) => {
    const { data, error } = await supabase
      .from('contacts')
      .update(updatedContact)
      .eq('id', updatedContact.id);

    if (error) {
      set({ error: error.message });
    } else {
      set(state => ({
        contacts: state.contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        ),
      }));
    }
  },

  toggleFavorite: async (contactId) => {
    const contact = get().contacts.find(contact => contact.id === contactId);
    const updatedContact = { ...contact, is_favorite: !contact.is_favorite };

    const { data, error } = await supabase
      .from('contacts')
      .update({ is_favorite: updatedContact.is_favorite })
      .eq('id', contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set(state => ({
        contacts: state.contacts.map(contact =>
          contact.id === contactId ? updatedContact : contact
        ),
      }));
    }
  },

  softDeleteContact: async (contactId) => {
    const { data, error } = await supabase
      .from('contacts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set(state => ({
        contacts: state.contacts.filter(contact => contact.id !== contactId),
      }));
    }
  },

  deleteContact: async (contactId) => {
    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId);

    if (error) {
      set({ error: error.message });
    } else {
      set(state => ({
        contacts: state.contacts.filter(contact => contact.id !== contactId),
      }));
    }
  },
}));
