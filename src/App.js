import React, { useState, useRef } from "react";
import AutocompleteTagsInput from "./components/react-autocomplete-tags-input/AutocompleteTagsInput";

function App() {

  const tagInputRef = useRef();
  // eslint-disable-next-line
  const [tags, setTags] = useState([]);

  const selectedTags = (tags) => {
    setTags(tags)
  };


  return (
    <div>
      <h1 className="text-center">Try this example out</h1>
      <AutocompleteTagsInput
        selectedTags={selectedTags}
        tags={['React']}
        ref={tagInputRef}
      />
      <p className="text-center">Example suggestion tags: Reading, Writing, Swimming, Hiking, Music, React</p>
    </div>
  );
}

export default App;
