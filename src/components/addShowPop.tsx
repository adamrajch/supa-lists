import { AppBar, Grid, InputBase, Paper, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { MediaCard } from "./mediaCard";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    grow: {
      flexGrow: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [lists, setLists] = useState([]);
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchLists();
  }, []);
  async function fetchLists() {
    const { data } = await supabase.from("lists").select();
    setLists(data);
    console.log("data: ", data);
  }

  //   function createList() {}

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      fetchMedia(query);
    }

    // fetch from media api
  };
  const fetchMedia = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    ).then((res) => res.json());
    if (temp.results && temp.results.length > 0) {
      setAnime(temp.results);
    } else {
      // show error message
    }

    console.log(temp.results);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Show
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                className={classes.grow}
              >
                Add Show to List
              </Typography>
              <IconButton
                //   edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search anime"
            inputProps={{ "aria-label": "search anime" }}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <IconButton
            onClick={() => {
              setQuery(""), setAnime([]);
            }}
            className={classes.iconButton}
            aria-label="close"
            color="primary"
          >
            <CloseIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={(e) => handleSearch(e)}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <Grid container justifyContent="center" spacing={1}>
          {anime.length > 0 ? (
            <>
              {anime.map((m) => (
                <Grid key={m.mal_id} item>
                  <MediaCard
                    title={m.title}
                    img={m.image_url}
                    score={m.score}
                    show={m}
                  />
                </Grid>
              ))}
            </>
          ) : null}
        </Grid>
      </Dialog>
    </div>
  );
}
