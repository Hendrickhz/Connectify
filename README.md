Connectify is a contact management web application built using React and Supabase. Users can securely log in, manage their contacts, and utilize various features such as adding to favorites, soft deleting, and searching for contacts. The application leverages Supabase for authentication, storage, and database management, ensuring robust security and privacy.

Features
--------

*   **User Authentication**: Users can sign up and log in using their email and password.
    
*   **Contact Management**:
    
    *   **Create Contacts**: Users can add new contacts to their list.
        
    *   **Edit Contacts**: Users can update the details of their existing contacts.
        
    *   **Add to Favorites**: Mark contacts as favorites for quick access.
        
    *   **Soft Delete**: Soft delete contacts, moving them to a trash bin.
        
    *   **Permanent Delete**: Permanently delete contacts from the trash bin.
        
    *   **Restore Contacts**: Restore contacts from the trash bin to the main list.
        
*   **Search Contacts**: Users can search for contacts they have created.
    
*   **Avatar Storage**: Users can upload and manage avatars for their contacts using Supabase storage.
    
*   **Role Level Security**: Implemented to ensure that users can only access and manage their own contacts.
    
*   **State Management**: Using Zustand for efficient state management.
    
*   **Routing**: Utilizing React Router for navigation within the application.
    

Technology Stack
----------------

*   **Front-end**: React + MUI
    
*   **State Management**: Zustand
    
*   **Routing**: React Router
    
*   **Backend Services**: Supabase (for Auth, Database, and Storage)
    





1.  The application will be available at [Here](https://connectify-by-hendrick.vercel.app/).
    

Usage
-----

### Authentication

*   Users can sign up with their email and password.
    
*   Existing users can log in with their credentials.
    

### Managing Contacts

*   **Create a Contact**: Navigate to the "Add Contact" page, fill in the details, and save.
    
*   **Edit a Contact**: Click on a contact to view details and then edit.
    
*   **Add to Favorites**: Click the favorite icon on a contact to mark it as a favorite.
    
*   **Soft Delete**: Move a contact to the trash bin without permanently deleting it.
    
*   **Permanent Delete**: Permanently delete a contact from the trash bin.
    
*   **Restore Contact**: Restore a contact from the trash bin back to the main list.
    
*   **Search Contacts**: Use the search bar to find specific contacts.
    

### Security and Privacy

*   **Role Level Security**: Each user can only see and manage the contacts they have created, ensuring privacy and security of data.
    

Feel free to reach out if you have any questions or need further assistance. Happy coding!