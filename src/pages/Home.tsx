import React from "react";
import TileWrapper from "../components/TileWrapper";
import { connect } from "react-redux";
import Tile from "../components/Tile";
import { IComment, IState } from "../store/types";

interface HomeProps {
  comments?: IComment[];
}

const Home = ({ comments }: HomeProps): JSX.Element => {
  return (
    <TileWrapper>
      {comments &&
        comments.map(
          (
            { id, name, email, body, chosen = false }: any,
            index: number
          ): JSX.Element => (
            <Tile
              id={id}
              key={index}
              name={name}
              email={email}
              body={body}
              chosen={chosen}
            />
          )
        )}
    </TileWrapper>
  );
};

const mapStateToProps = ({ comments }: IState) => ({
  comments,
});

export default connect(mapStateToProps, null)(Home);
