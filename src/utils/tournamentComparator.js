export function compareTournamentByDate(tournament1, tournament2) {
    return new Date(tournament1.endDate) - new Date(tournament2.endDate);
}