import React from "react";
import ReactDOM from 'react-dom';
import * as marked from 'marked';
import styles from './styles.css';


const initialMarkdown = `
# Exploring the World of Dune

## The Universe of Dune

Frank Herbert's *Dune* is one of the most influential science fiction novels ever written. You can find more about the book on its [Wikipedia page](https://en.wikipedia.org/wiki/Dune_(novel)).

### Key Elements
- **Planets:** The story unfolds across various planets, with Arrakis being the most significant due to its supply of Melange.
- **Factions:** Various factions struggle for power, including the Harkonnens and the Atreides.

### Famous Quote from Dune
> "Fear is the mind-killer." - Frank Herbert

![Sand Dunes](https://orbitaltoday.com/wp-content/uploads/2024/02/dune-arrakis-movie-planet.jpg) 
_Image of a desert landscape reminiscent of Arrakis._

\`\`\`javascript
// Simple JavaScript code snippet
console.log('Welcome to Dune!');
\`\`\`

For more code snippets like \`console.log('Hello, Dune!');\`, stay tuned to our updates.

**Note:** Ensure to visit the official Dune website for the latest updates on the series!
`;

class MarkdownPreviewer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: initialMarkdown,
            editorMaximized: false,
            previewMaximized: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleMaximizeEditor = this.toggleMaximizeEditor.bind(this);
        this.toggleMaximizePreview = this.toggleMaximizePreview.bind(this);
    }

    handleChange(event){
        const inputValue = event.target.value;
        this.setState(state => ({
          input: inputValue,
        }))
    };

    componentDidMount() {
        const style = document.createElement('style');
        style.innerHTML = styles;
        document.head.appendChild(style);
    }

    toggleMaximizeEditor() {
        this.setState(prevState => ({
          editorMaximized: !prevState.editorMaximized,
          previewMaximized: false // Ensure only one can be maximized at a time
        }));
    }
    
    toggleMaximizePreview() {
    this.setState(prevState => ({
        previewMaximized: !prevState.previewMaximized,
        editorMaximized: false // Ensure only one can be maximized at a time
    }));
    }

    render() {
        const markdown = marked.parse(this.state.input)
        return (
          <div id="Container">
            <div className={`editorWrap ${this.state.editorMaximized ? 'maximized' : this.state.previewMaximized ? 'hide' : ''}`}>
              <div className="toolbar">Editor
                <i className="fas fa-compress" onClick={this.toggleMaximizeEditor}></i>
              </div>
              <textarea
                id="editor"
                className="editor"
                value={this.state.input}
                onChange={this.handleChange}
                type="text"
              ></textarea>
            </div>
            <div className={`previewWrap ${this.state.previewMaximized ? 'maximized' :  this.state.editorMaximized ? 'hide' : ''}`}>
              <div className="toolbar">Markdown Previewer:
                <i className="fas fa-compress" onClick={this.toggleMaximizePreview}></i>
              </div>
              <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }} />
            </div>
          </div>
        );
      }
};

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'));
