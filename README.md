# My Portfolio

This is my personal portfolio website, crafted by me, <a href="https://github.com/leoteissier">@leoteissier</a>, with design assistance from <a href="https://www.behance.net/darelova" target="_blank">@darelova</a>. It serves as a gateway for anyone eager to delve deeper into my professional journey. Whether you're a potential employer, client, collaborator, or simply curious about my achievements and skill set, this portfolio offers an attractive and structured presentation of my work. It showcases a variety of my projects, emphasizes my skills and expertise, and offers a glimpse into my career path. In essence, it's a valuable resource for anyone seeking to connect with or consider me for opportunities.


## Tech Stack

**Client:** Nuxt3, TailwindCSS


## Construire l'image Docker

1. Clone the project

```bash
git clone https://github.com/leoteissier/portfoliov2.git
```

2. Go to the project directory

```bash
cd portfolio
```

3. Build the Docker container

```bash
sudo docker build -t portfolio-app -f docker/Dockerfile .
```

4. Start the container

```bash
docker run -d -p 3000:3000 --name portfolio-app portfolio-app
```

5. Open your browser and go to http://localhost:3000 to view the application.

## Authors

- [@leoteissier](https://www.github.com/leoteissier)


## License

[MIT](https://choosealicense.com/licenses/mit/)

