The server has main prefix in API:

# prefix: /api/v1

### auth: /auth

post `/login` - json - req.body = { email, password }

post `/signup` - json - req.body = { email, name, password }

### post: /post

post `/` - json - req.body = { title, content, imgUrl }

get `/` - req.query: { page, limit }

get `/:id`

put `/:id` - json - req.body = { title, content, imgUrl }

delete `/:id`
