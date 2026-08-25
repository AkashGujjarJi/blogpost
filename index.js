import express from "express";
import bodyParser from "body-parser"
const app = express();
const PORT = 3000;


app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { postedBlogs: postedBlogs });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/post/:id", (req, res) => {
  const blogId = req.params.id;
  const viewingPost = postedBlogs.find(post => post.id === blogId);
  res.render("post", {
    viewingPost: viewingPost,
  });
});

app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const editPost = postedBlogs.find(post => post.id === blogId);
  res.render("edit", { editPost: editPost });
});

app.get("/delete/:id", (req, res) => {
  const blogId = req.params.id;
  const postIndex = postedBlogs.findIndex(article => article.id === blogId);
  postedBlogs.splice(postIndex, 1);
  res.redirect("/");
});

app.post("/edit/editedBlog/:id", (req, res) => {
  const toUpdate = postedBlogs.find(article => article.id === req.params.id);
  toUpdate.title = req.body.title;
  toUpdate.content = req.body.content;
  res.redirect("/");
});

app.post("/postblog", (req, res) => {
  const uniqueId = uniqueIdGenerator();
  const newBlog = {
    id: uniqueId,
    title: req.body.title,
    content: req.body.content
  };
  console.log(`created ${newBlog}`);
  postedBlogs.push(newBlog);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



function uniqueIdGenerator() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const fullDateTime = `${year}${month}${day}-${hours}${minutes}${seconds}`;
  const randomNum = String(Math.floor(Math.random() * 1000)).padStart(4, '0');

  return `${fullDateTime}-${randomNum}`;
}

const postedBlogs = [
  {
    id: `20260820-073017-0836`,
    title: "Billboard",
    content: "Best known for the Hot 100 and Billboard 200, which list the most popular songs and albums each week in the industry. Offers industry news, events, podcasts, and music streaming."
  },
  {
    id: `20260820-073017-0837`,
    title: "Business Insider",
    content: "High-end business journalism keeping readers up-to-date on economic news as well as interviews with top entrepreneurs. There’s also educated predictions, trend analyses, and tips."
  },
  {
    id: `20260820-073017-0838`,
    title: "People",
    content: "Covers all things showbusiness, including celebrity gossip, entertainment news, and the latest on new shows, movies, and popular books."
  },
{
  id: "20260822-083415-0939",
  title: "Entrepreneur",
  content: "Find business news, webinars and events, book recommendations, and interviews with successful entrepreneurs. The site is updated daily and even has a magazine for longer-form pieces."
},
{
  id: "20260822-083615-0299",
  title: "Seeking Alpha",
  content: "Seeking Alpha is an investing community which includes millions of passionate investors who connect daily to discuss the latest news, debate the merits of stocks and investment decisions."
},
{
  id: "20260822-083652-0245",
  title: "The Athletic",
  content: "This site offers a subscription for in-depth sports news and features. It also has a podcast for avid sports fans. Find articles about major sports, sports teams, and top cities."
}];