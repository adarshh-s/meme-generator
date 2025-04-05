import { useState, useEffect } from 'react';
export default function Main() {
  const [meme, setMeme] = useState({
    topText: 'one does not simply',
    bottomText: 'walk into Mordor',
    imageUrl: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch(' https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  });

  function getMemeImage() {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const randomMeme = allMemes[randomIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: randomMeme,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top text
          <input
            type="text"
            name="topText"
            placeholder="One does not simply"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>
        <label>
          Bottom text
          <input
            type="text"
            name="bottomText"
            placeholder="Walk into Mordor"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} alt="meme" />
        <span className="meme-text top">{meme.topText}</span>
        <span className="meme-text bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
