import {addCompany} from "@/actions/company.action";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import toast from "react-hot-toast";

const AddCompanyModal = ({open, setOpen, onAdd}) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    const res = await addCompany(formData);
    if (!res.success) {
      toast.error(res.message);
      return;
    }   

    onAdd(res.data);

    toast.success("Company Created Successfully");
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Company</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Company Name: </Label>
              <Input
                id="name-1"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Logo Url: </Label>
              <Input
                id="username-1"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Add Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCompanyModal;
