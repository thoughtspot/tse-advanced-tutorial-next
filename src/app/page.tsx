export default function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-24">
      <div id="welcome">
        <h1>Welcome to ThoughtSpot Everywhere Advanced Training</h1>
        <p>
          This application is intended to help you learn to more tightly
          integrate ThoughtSpot into your application using ReactJS/NextJS. It
          contains the following learning topics:
        </p>
        <p>&nbsp;</p>

        <ul className="instructions list-disc list-inside">
          <li>Authenticating using trusted authentication.</li>
          <li>Handling system events and sending host events.</li>
          <li>
            Responding to custom actions to extend the capabilities of
            ThoughtSpot.
          </li>
          <li>Call the SearchData API and rending in your application.</li>
          <li>
            Use a custom CSS in the embedded ThoughtSpot to modify the visual
            style.
          </li>
        </ul>

        <h1>Page descriptions</h1>

        <ul className="instructions list-disc list-inside">
          <li>
            Events - contains two embedded search components with one responding
            to events in the other.
          </li>
          <li>
            Custom Action - shows an embedded liveboard with a custom action
            that adds new capabilities to ThoughSpot.
          </li>
          <li>
            Data API - shows a table based data from the SearchData API call.
          </li>
        </ul>
      </div>
    </main>
  );
}
