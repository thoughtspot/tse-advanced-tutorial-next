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
          <li>Authenticate using trusted authentication.</li>
          <li>Handle system events and send host events.</li>
          <li>
            Respond to custom actions to integrate with external applications.
          </li>
          <li>
            Use APIs to create a dashboard list page that updates automatically
            when users create content.
          </li>
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
          <li>Liveboards - Allows users to list liveboards and navigate.</li>
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
