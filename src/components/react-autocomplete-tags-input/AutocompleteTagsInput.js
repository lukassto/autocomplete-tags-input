import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./AutocompleteTagsInput.scss";
import TAGSJSON from "./tags.json";

function AutocompleteTagsInput(props, ref) {
  const [tags, setTags] = React.useState(props.tags);
  const [maxValue, setMaxValue] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [valueInput, setValueInput] = useState("");



  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (tags.length < 5) {
      if (event.target.value !== "") {
        setTags([...tags, event.target.value]);
        props.selectedTags([...tags, event.target.value]);
        event.target.value = "";
      }
      setValueInput("")
    } else {
      event.target.value = "";
      setValueInput("")
    }
  };

  const checkTags = () => {
    if (tags.length <= 5 && tags.length >= 1) {
      return true;
    }
  };

  useImperativeHandle(ref, () => ({
    checkTags() {
      const tags = checkTags();
      if (tags) {
        setMaxValue(true);
        return true;
      } else {
        setMaxValue(false);
        return false;
      }
    },
  }));

  const changeInput = (text) => {
    setValueInput(text)
    text = text.toLowerCase();
    
    if(text.length >= 1) {
      setSuggestions([])
      
      var tags = [];
      TAGSJSON.map((tag, index) => {
        if (tags.length < 3) {
          if(tag.tag.toLowerCase().startsWith(text)) {
            tags = [...tags, tag.tag];
          }          
        }
        return setSuggestions([...tags])
  
      });
    }
    else {  
      setSuggestions([])
    }
    
  };

  const addSuggestion = (suggestion) => {
    //console.log(suggestion)
    if (tags.length < 5) {
      if (suggestion !== "") {
        setTags([...tags, suggestion]);
        props.selectedTags([...tags, suggestion]);
      }
      setValueInput("")
      setSuggestions([]);
    }
  }

  
  return (
    <div>
      <div className="tags-input-body-container">
        <div className={maxValue ? "tags-input" : "tags-input-invalid"}>
          <ul id="tags">
            {tags.map((tag, index) => (
              <li key={index} className="tag">
                <span className="tag-title">{tag}</span>
                <span
                  className="tag-close-icon"
                  onClick={() => removeTags(index)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
            placeholder="Add up to 5 interests"
            onChange={(event) => changeInput(event.target.value)}
            value={valueInput}
          />
        </div>
      </div>
      <ul className="tags-input-body-container " style={{paddingTop: "1rem", display: "block", paddingRight:"20 rem"} }>
        {suggestions.map((suggestion, index) => (
          <div className="tag" style={{width:"10rem"}}>
            <li onClick={(event) => addSuggestion(event.target.outerText)}> {suggestion} </li>
          </div>
        ))}
      </ul>
      {maxValue === false && (
        <div className="text-danger mt-1">
          A maximum of 5 interests can be added
        </div>
      )}
    </div>
  );
}
// eslint-disable-next-line
AutocompleteTagsInput = forwardRef(AutocompleteTagsInput);
export default AutocompleteTagsInput;
