import {
    Users,
    UserPlus,
    BadgeCheck
} from "lucide-react";

function StatsCard({ title, value }) {

    const getIcon = () => {
        switch (title) {

            case "Total Leads":
                return (
                    <Users
                        size={22}
                        className="text-blue-600"
                    />
                );

            case "New Leads":
                return (
                    <UserPlus
                        size={22}
                        className="text-green-600"
                    />
                );

            case "Qualified":
                return (
                    <BadgeCheck
                        size={22}
                        className="text-purple-600"
                    />
                );

            default:
                return (
                    <Users
                        size={22}
                        className="text-slate-600"
                    />
                );
        }
    };

    return (

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-slate-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-slate-900">

                        {value}

                    </h2>

                </div>

                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">

                    {getIcon()}

                </div>

            </div>

        </div>

    );

}

export default StatsCard;