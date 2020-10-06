import React from "react";
import { List, ListItem, ListItemText, Paper, AppBar } from "@material-ui/core";
import "./News.css";

const hour = 60 * 60 * 1000;
const NEWS_API_HOST = "https://news67.p.rapidapi.com";
const NEWS_ENDPOINT_PATH = "/trending";
const NEWS_ENDPOINT = new URL(NEWS_ENDPOINT_PATH, NEWS_API_HOST);
const news_settings = {
  limit: "10",
  langs: "en",
  skip: "1",
};
const NEWS_URL_PARAMS = new URLSearchParams();
for (const [key, value] of Object.entries(news_settings)) {
  NEWS_URL_PARAMS.append(key, value);
}
class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshRate: hour,
    };
    this.getNews = this.getNews.bind(this);
  }

  async getNews() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const NEWS_API_URL = `${NEWS_ENDPOINT}?${NEWS_URL_PARAMS.toString()}`;
    console.log("getNews called");
    try {
      const response = await fetch(NEWS_API_URL, {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
        },
      });

      const data = await response.json();
      // console.log(response);
      // console.log("data", data);
      this.setState({
        data: data,
      });
    } catch (err) {
      console.dir(err);
      this.setState({
        error: err,
      });
    }
  }

  componentDidMount() {
    this.getNews();
  }

  render() {
    // const list = [];
    // for (let [index, story] of this.state.data.entries()) { [0, 'thing], [1, 'other]
    //   list.push(
    //     <li key={index}>
    //       <img src={story.urlToImage} alt={''} width="50" />
    //       <a href={story.url}>{story.title}</a> by{story.author}{' '}
    //     </li>
    //   );
    // }
    const styles = {
      paper: {
        padding: "15px",
      },
      image: {
        marginRight: "15px",
        width: "100px",
      },
      ul: {
        display: "flex",
        flexWrap: "wrap",
      },
      header: {
        padding: "15px",
      },
    };

    return (
      <>
        <AppBar position="static" style={styles.header}>
          <h1>{this.props.heading}</h1>
        </AppBar>

        <Paper elevation={3} style={styles.paper}>
          <List>
            {this.state.data.map((story, i) => (
              <ListItem key={i} className="news">
                <img style={styles.image} src={story.image} alt={story.title} />
                <ListItemText
                  primary={<a href={story.url}> {story.title}</a>}
                  secondary={`by ${story.description}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </>
    );
  }
}
export default News;
