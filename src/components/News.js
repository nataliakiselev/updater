import React from 'react';

const hour = 60 * 60 * 1000;
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
    console.log('getNews called');
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8dee90b41a204fc99f1546b1d85b3a1a'
      );
      const data = await response.json();
      console.log(response);
      const articles = data.articles;
      console.log('data', data);
      this.setState({
        data: articles,
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
      listStyle: 'none',
    };

    return (
      <div>
        <h1>{this.props.heading}</h1>
        <ul style={styles}>
          {this.state.data.map((story, i) => (
            <li key={i}>
              <img src={story.urlToImage} alt={''} width="50" />
              <a href={story.url}>{story.title}</a> by{story.author}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default News;
