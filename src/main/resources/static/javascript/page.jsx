import PageUtils from "page-utils";
import SocketHandler from "socket-handler";
import Grid from "grid";

$(function() { // runs when document finishes loading
    if(PageUtils.loadPageConfig()) {
        SocketHandler.connect(PageUtils.getWebSocketPageAddress());
        console.log("render")
        ReactDOM.render(
            <Grid>
                {PageUtils.renderWidgets()}
            </Grid>,
            $('#reactapp')[ 0 ]
        );
        console.log("render")
    } else {
        let err = textStatus + ', ' + error;
        ReactDOM.render(
        <div>
            <div class='alert alert-danger p-2 show' role='alert'>
                There was an error loading the JSON config from the robot:
                <br />
                <b>{err}</b>
            </div>
        </div>,
        $('#reactapp')[ 0 ]);
    }
});
