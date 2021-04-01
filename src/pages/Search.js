import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import ResizeObserver from 'react-resize-observer';

import React, { useState, useEffect, useRef } from 'react';

const webSDKKey = 'zOGifukXKpOJH4XuptyPEfhFJWVtFP5g';
const gf = new GiphyFetch(webSDKKey);

// // fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
// const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });

function Home() {
  const [alert, setAlert] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [keyword, setKeyword] = useState('cute');

  const inputRef = useRef(null);
  const fetchGifs = (offset) => gf.search(keyword, { offset, limit: 10 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [alert]);

  // useRef to select all text in input
  function handleFocus() {
    inputRef.current.select();
  }

  return (
    <>
      <div className='input'>
        <input
          ref={inputRef}
          name='inputbar'
          class='form_field'
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
        />
        <label for='inputbar' class='form_label'>
          Search for a GIF
        </label>
      </div>

      <div className='gifs'>
        <Grid
          key={keyword}
          width={width}
          columns={3}
          gutter={20}
          fetchGifs={fetchGifs}
          hideAttribution={true}
          onGifClick={(gif, e) => {
            //console.log(e.target.src);
            navigator.clipboard.writeText(e.target.src);
            setAlert(true);
            e.preventDefault();
          }}
        />
        {alert && <p className='alert'> copied to clipboard</p>}
        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
      </div>
    </>
  );
}
export default Home;
