export default function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-24">
      <div id="welcome">
        <h1>Welcome to ThoughtSpot Everywhere Advanced Training</h1>
        <p>
          This application is designed to let you learn to more tightly
          integrate ThoughtSpot into your application. It contains the following
          learning topics:
        </p>
        <p>&nbsp;</p>

        <ul className="instructions list-disc list-inside">
          <li>Authenticating using trusted authentication.</li>
          <li>Using REST APIs to get system information.</li>
          <li>Handling system events and sending host events.</li>
          <li>
            Responding to custom actions to extend the capabilities of
            ThoughtSpot.
          </li>
          <li>Call the SearchData API and rending in your application.</li>
          <li>Use a custom CSS in the embedded ThoughtSpot.</li>
        </ul>

        <h1>Page descriptions</h1>

        <ul className="instructions list-disc list-inside">
          <li>
            Host Event - contains two embedded search components with one
            responding to actions in the other.
          </li>
          <li>
            Custom Action - shows an embedded liveboard with a custom action.
          </li>
          <li>
            Data API - shows a table based data from the SearchData API call.
          </li>
        </ul>
      </div>
    </main>
  );
}
