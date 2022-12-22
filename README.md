# Book Inventory Management System using Node and MySQL

Required Dependencies:
1. npm init
2. npm install node
3. npm -v
4. npm install nodemon 
5. npm install express
6. npm install ejs
7. npm install mysql
8. npm install connect-flash
9. npm install bcrypt
10. npm install node-fpdf
11. npm install pdf-to-printer
12. npm install tmp

Features :
- User can sign up and then login into the System
- As an employee, he can order books from Add Inventory Section. For simplicity, books and book category data are already populated in the database. 
  Initially the order status is PENDING
- I've assumed that through some means, the book will be delivered to the store and now the employee confirms it via Manage Inventory Section. 
  Based on the quantity, the stock quantity is also updated. 
- All the available book stocks and books for exploration is visible via Dashboard section
- User can logout of the system.
