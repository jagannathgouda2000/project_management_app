import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMembers from "./team-members";
import { AddMember } from "./add-member";
import MemberRequests from "./member-requests";

const ManageTeam = ({
  userName,
  userEmail,
  userId,
}: {
  userName: string;
  userEmail: string;
  userId: string;
}) => {
  return (
    <Tabs defaultValue="members" className="mb-10 mt-4 md:mb-20">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="Requests">Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Members</CardTitle>
                <CardDescription>
                  Make changes to your team here.
                </CardDescription>
              </div>
              <AddMember />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-4 md:p-6">
            <TeamMembers />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Requests">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Requests</CardTitle>
                <CardDescription>Manage your requests.</CardDescription>
              </div>
              <AddMember />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <MemberRequests />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ManageTeam;
