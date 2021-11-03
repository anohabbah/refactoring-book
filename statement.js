/* eslint-disable no-unused-vars */
const createStatementData = require("./createStatementData");
// const invoices = require("./invoices.json");
// const plays = require("./plays.json");

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  data.performances.forEach((perf) => {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  });

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  data.performances.forEach((perf) => {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  });
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

/**
 * @param { { customer: string, performances: { playID: string, audience: string }[] } } invoice
 * @param { { type: string, name: string } } plays
 * @return {string}
 */
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

// const expectedResult = `Statement for BigCo
//   Hamlet: $650.00 (55 seats)
//   As You Like It: $580.00 (35 seats)
//   Othello: $500.00 (40 seats)
// Amount owed is $1,730.00
// You earned 47 credits
// `;
// console.log(statement(invoices[0], plays) === expectedResult);
