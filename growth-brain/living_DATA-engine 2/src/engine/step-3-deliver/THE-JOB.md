# JOB CARD: Deliver

## What Comes In
Approved `hitl_queue` items (Social Posts) or finalized Growth Recommendations that a human has clicked "Approve & Fire" on in the Dashboard.

## What You Do With It
Fetch the approved data. Cryptographically seal the execution log (hash the data and link it to the previous hash) and store it in `action_proofs`. Fire the payload to the external destination (Make.com webhook).

## What Goes Out
HTTP POST requests to external automation webhooks containing the validated, human-approved data.

## How You Know You Are Done
The external webhook returns a 200 OK, and the cryptographic seal is successfully committed to the SQLite database.
