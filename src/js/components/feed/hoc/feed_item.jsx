import util from "services/util";

function FeedItemFactory(GridTransclusion, CardTransclusion) {

  class GridItem extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      let {props} = this;

      return (
        <div className="feed-display__grid-item">
          <GridTransclusion {...props} />
        </div>
      );
    }

  }

  return GridItem;

}

export default FeedItemFactory;
