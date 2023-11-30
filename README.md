# CODE LIVE SITE LINK: 
## https://gadget-harbor.web.app/


# SignUp:
The SignUp component utilizes React, React-Router, and React-Hook-Form for form handling. It captures user details, including name, email, password, and photoURL. Upon submission, it creates a new user account, uploads the user's photo to an image hosting service, updates the user's profile, and stores user information in a database. Error handling and feedback are provided through SweetAlert2 popups.
# Login: 
The Login component handles user authentication by validating the provided email, password, and a simple captcha. Upon form submission, it calls the signIn function from the AuthContext, authenticates the user, and redirects to the previous page or the home page on success. The component also provides Google login and includes a forgot password link. Successful logins trigger a SweetAlert popup with a success 
# Dashboard:
The Dashboard component dynamically renders a sidebar menu based on the user's role (admin, moderator, or regular user). Admins access user management, statistics, and coupon management. Moderators handle product review queues and reported contents. Regular users navigate their home, add products, and manage their listings. Shared links to the home and products are accessible to all. The main content is displayed in the remaining flex container.
# User:
## 1:
UserAddProduct enables users to add products by submitting a form. It gathers product details including name, photo, description, owner information, tags, and external links. Upon submission, it uploads the product photo to ImgBB using a secure API call, then sends the product data to MongoDB. Success triggers a SweetAlert2 success message, and users are redirected to their product management dashboard.
## 2:
UserMyProduct fetches a user's added products using the useUserMyProduct hook. It displays product details in a table with options to update or delete. The delete option triggers a confirmation modal using SweetAlert2. Upon confirmation, it makes a secure API call to delete the product. The table dynamically updates with the latest product data after deletion.
## 3: 
UserUpdateProduct retrieves the existing product details using useLoaderData, populating the update form with current information. Upon form submission, it updates the product on the server using a PATCH request. Success triggers a SweetAlert2 success message, and users are redirected to their product management dashboard. The form is pre-filled with the current product data, and users can modify the desired fields before submitting the update.
# Admin: 
## 1:
AllUser component fetches user data using the TanStack useQuery hook. It displays user information in a table with options to make a user an admin, make them a moderator, or delete their account. The functions handleMakeAdmin, handleMakeModerator, and handleDeleteUser interact with the server, triggering updates or deletions based on user actions. SweetAlert2 provides user feedback on successful actions, and the table dynamically updates with TanStack's refetch function.
## 2:
The Statistics component fetches data for users, reviews, and user-added products using TanStack's useQuery hook. It calculates the total count for each category, and then uses the Recharts library to display this data in a pie chart. The chart dynamically updates as data changes. The component also presents the total counts for products, reviews, and users in a tabular format, providing a visual overview of the platform's statistics.
# Moderator:
The ProductReviewPage component fetches user-added products awaiting review. It provides options to make a product featured, accept it, or reject it. Upon feature or acceptance, it triggers updates in the database. The component also allows deleting a product, and the actions prompt confirmation dialogs using Swal (SweetAlert). The interface is designed for efficient product review and management, offering flexibility in handling different product states.

