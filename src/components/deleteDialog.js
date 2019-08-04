import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteDialog = ({ post, handleDelete, cancel }) => {
  // const [open, setOpen] = React.useState(true);

  const handleClose = post => {
    // setOpen(false);
    // cancel(post);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={cancel(post)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You're about to delete:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {post.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(post)} variant="contained">
            cancel
          </Button>
          <Button
            onClick={() => handleDelete(post)}
            color="secondary"
            variant="contained"
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
