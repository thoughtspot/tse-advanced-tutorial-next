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
            Responding to custom actions to integrate with external
            applications.
          </li>
          <li>Create your own chatbot using a bodyless conversation.</li>
        </ul>

        <h1>Page descriptions</h1>

        <ul className="instructions list-disc list-inside">
          <li>
            Events - contains two embedded search components with one responding
            to events in the other.
          </li>
          <li>
            Custom Action - Embed a search with a code-based custom action to
            send data to an external application.
          </li>
          <li>Chat - Allows you to use natural language queries to ask for</li>
          {/*
          <li>
            Data API - shows a table based data from the SearchData API call.
          </li>
          */}
        </ul>
      </div>
    </main>
  );
}
