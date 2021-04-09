using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CySecApp_COMP1004
{
    public class Data
    {
        private static List<User> data = new List<User>();
        private static int currentUserID = 0;

        public static void Init()
        {

            string[] file = System.IO.File.ReadAllText("logins.csv").Split("\n");
            foreach (string line in file)
            {
                if (line != "")
                {
                    string[] split = line.Split(',');
                    User user = new User();
                    user.id = Convert.ToInt32(split[0]);
                    currentUserID = user.id;
                    user.FirstName = split[1];
                    user.LastName = split[2].Replace("\r", "");
                    data.Add(user);
                }
            }
        }

        public static List<User> GetData()
        {
            return data;
        }

        public static void PushData(User newUSer)
        {
            currentUserID++;
            newUSer.id = currentUserID;
            data.Add(newUSer);
            WriteToFile();
        }

        public static bool Delete(int id)
        {
            User toDelete = null;
            foreach (User user in data)
            {
                if (user.id == id)
                {
                    toDelete = user;
                }
            }
            if (toDelete != null)
            {
                data.Remove(toDelete);
                WriteToFile();
                return true;
            }
            else
            {
                return false;
            }
        }

        public static void Edit(int id, User newUser)
        {
            // Find the id
            for (int i = 0; i < data.Count; i++)
            {
                // Match the id
                if (data[i].id == id)
                {
                    // If it matches, update
                    data[i] = newUser;
                }
            }


            // Save the new data
            WriteToFile();
        }

        public static User GetUser(int id)
        {
            for (int i = 0; i < data.Count; i++)
            {
                // Match the id
                if (data[i].id == id)
                {
                    return data[i];
                }
            }
            return null;
        }

        private static void WriteToFile()
        {
            StreamWriter writer = new StreamWriter("logins.csv");

            foreach (User item in data)
            {
                writer.WriteLine($"{item.id},{item.FirstName},{item.LastName}");
            }

            //Save the file and write it out
            writer.Flush();
            writer.Close();
            writer.Dispose();
        }
    }
}
