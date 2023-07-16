export function compareByPlace (player1, player2){
    if(player1.place < player2.place) return -1;
    if(player1.place > player2.place) return 1;
    return compareByScore (player1, player2);
}
export function compareByScore (player1, player2){
    if(player1.score > player2.score) return -1;
    if(player1.score < player2.score) return 1;
    return compareByGorinRank(player1, player2);
}

export function compareByGorinRank(player1, player2){
    if(player1.gorinRank > player2.gorinRank) return -1;
    if(player1.gorinRank < player2.gorinRank) return 1;
    return compareByAdamovichRank(player1, player2);
}

export function compareByAdamovichRank(player1, player2){
    if(player1.lastAdamovichRank > player2.lastAdamovichRank) return -1;
    if(player1.lastAdamovichRank < player2.lastAdamovichRank) return 1;
    return compareByBirthday(player1, player2);
}

export function compareByBirthday(player1, player2){
    if(new Date(player1.birthday) > new Date(player2.birthday)) return -1;
    if(new Date(player1.birthday) < new Date(player2.birthday)) return 1;
    return compareByPlayerName(player1, player2);
}

export function compareByPlayerName (player1, player2){
    if(player1.playerName > player2.playerName) return 1;
    if(player1.playerName < player2.playerName) return -1;
    return 0;
}

export function comparePlayerStatsByTournaments(tournaments, stat1, stat2) {
    const tournament1 = tournaments.find(tournament => tournament._id === stat1.tournamentID);
    const tournament2 = tournaments.find(tournament => tournament._id === stat2.tournamentID);
    const tournament1Index = tournaments.indexOf(tournament1);
    const tournament2Index = tournaments.indexOf(tournament2);

    return tournament1Index - tournament2Index;
}