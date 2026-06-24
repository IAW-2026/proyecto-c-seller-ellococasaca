import { Loader2, Star } from "lucide-react";

export default function FeedbackGridSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex flex-col items-center">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl shadow-lg shadow-blue-200 animate-bounce flex items-center justify-center">
          <Star className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
          <span className="text-sm font-black uppercase tracking-wider text-gray-400">
            Cargando tus casacas...
          </span>
        </div>
      </div>
    </div>
  );
}