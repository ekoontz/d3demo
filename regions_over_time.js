var regionserver_histories = [

    // regionserver 1: a reliable workhorse that has never gone down.
    [5,  5,  6,  6,  7,  7, 8, 7, 8],

    // regionserver 2: the "come-back kid": it came down but miraculously recovered."
    [7,  7,  2,  0,  0,  8, 12, 13, 12],

    // regionserver 3: a box that starts off well but sadly, crashes and
    // never comes back up.
    // the other machines, regionservers 1 and 2, had to pick up its load,
    // the poor things!
    [10, 10, 11, 0,  0,  0, 0, 0, 0]];


streamgraph("#rsload", regionserver_histories);
