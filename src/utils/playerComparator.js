export const compareByName = (player1, player2) => {
    const player1Name = `${player1.lastName} ${player1.firstName} ${player1.middleName}`;
    const player2Name = `${player2.lastName} ${player2.firstName} ${player2.middleName}`;

    if(player1Name > player2Name) return 1;
    else if(player1Name < player2Name) return -1;
    return 0;
}