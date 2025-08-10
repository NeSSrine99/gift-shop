import Button from "@/components/ui/Button";

export default function SubmitButton({ loading, successMsg }) {
  return (
    <div className="md:col-span-3 mt-6 text-center">
      <Button type="submit" className="" disabled={loading}>
        {loading ? "Sending..." : "Send Request"}
      </Button>
      {successMsg && (
        <p className="mt-4 text-green-600 font-semibold">{successMsg}</p>
      )}
    </div>
  );
}
