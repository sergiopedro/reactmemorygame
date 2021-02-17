import React, { Component } from 'react';
import './App.css';

const TILE_COUNT = 24;

class App extends Component {

    constructor(props) {
        super(props);
        // Initial states start with a blank number of tiles
        this.state = {
            tiles: [],
            last_Flipped: null,
            clicks: 0
        };
        this.resetTiles = this.resetTiles.bind(this);
        this.flipTile = this.flipTile.bind(this);
    }

    resetTiles() {
        // Starting with 0 tiles
        let tiles = [];
        let number = 0;
        for (let i = 0; i < TILE_COUNT; i += 2) {
            number++
            //Create two tiles
            let tileOne = { flipped: true, matched: false, number};
            let tileTwo = { flipped: true, matched: false, number};
                // And add those to the list of tiles
                tiles = [...tiles, tileOne, tileTwo];
        }
        //Randomize the tiles
        for (let i = 0; i < tiles.length; i++) {
            // For each tile, pick a random one to switch it with
            const swapWith = Math.floor(Math.random() * tiles.length);
            // Swap the two tiles in place
            [tiles[i], tiles[swapWith]] = [tiles[swapWith], tiles[i]];
        }
        // Then update the state so the game starts over
         this.setState({ clicks: 0, tiles });
    }

    renderTile(tile, index) {
        let classes = ["Tile"];
        let key = `tile-${index}`;

        if (tile.flipped) {
            classes = [...classes, "flipped"];
        }
        return (
            <div key={key} className={classes.join(" ")}    onClick={() => this.flipTile(index)}>
                {!tile.flipped && tile.number}
            </div>
        );
    }


    flipTile(index) {
        let tiles = this.state.tiles;
        let tile = tiles[index];
        let clicks = this.state.clicks + 1;
        let lastFlipped = this.state.lastFlipped;


        if (lastFlipped === null) {
            tiles = this.flipAllBackOver(tiles);
            tile.flipped = !tile.flipped;
            lastFlipped = index;
            tiles[index] = tile;
            this.setState({ clicks, tiles, lastFlipped });


        } else {
            tile.flipped = !tile.flipped;
            let lastFlippedTile = this.state.tiles[lastFlipped];
            if (lastFlippedTile.number === tile.number) {
                lastFlippedTile.matched = true;
                tile.matched = true;
                tiles[lastFlipped] = lastFlippedTile;

            }
        }
        lastFlipped = null;
    }

    flipAllBackOver(tiles) {
        // For each tile, we want to see if it is matched. If it isn't, we flip it back over.
        // Otherwise we leave it be.
        tiles.forEach(tile => {
            if (!tile.matched) {
                tile.flipped = true;
            }
        });
        return tiles;
    }

    render() {

        return(
            <div className="App">
                <h1>Memory Game</h1>
                <strong>Clicks: {this.state.clicks}</strong>
                <br/>
                <button onClick={this.resetTiles} className="reset">New Game</button>
                <hr />
                {this.state.tiles.map((tile, index) => this.renderTile(tile,   index))}
            </div>
        );
    };
}

export default App;
