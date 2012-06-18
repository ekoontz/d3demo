var regionserver_histories = [

    // regionserver 1: a reliable workhorse that has never gone down.
    [2, 2, 3, 5],
    // regionserver 2: the "come-back kid": it came down but miraculously recovered
    [2, 5, 4, 4],
    // regionserver 3: a box that starts off well but sadly, crashes and
    // never comes back up.
    [2, 2, 1, 2] 
];


streamgraph("#rsload", regionserver_histories);
