import { Suspense } from "react";

import { FeedbackHeader } from "@/src/components/ui/feedback/feedback-header";
import FeedbackContent from "@/src/components/ui/feedback/feedback-content";
import FeedbackGridSkeleton from "@/src/components/ui/feedback/feedback-grid-skeleton";

export default function FeedbacksPage() {
  return (
    <main className="min-h-screen pt-20 pb-10 px-4">

      <div className="max-w-5xl mx-auto">

        <FeedbackHeader />

        <Suspense
          fallback={
            <FeedbackGridSkeleton />
          }
        >
          <FeedbackContent />
        </Suspense>

      </div>

    </main>
  );
}
