import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMembers from "./team-members";

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
    <Tabs defaultValue="members" className="mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="Requests">Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>Make changes to your team here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 p-4 md:p-6">
            <TeamMembers />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Requests">
        <Card>
          <CardHeader>
            <CardTitle>Requests</CardTitle>
            <CardDescription>.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* <div className="space-y-1">
              <Label htmlFor="current">Current Requests</Label>
              <Input id="current" type="Requests" />
            </div> */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ManageTeam;
