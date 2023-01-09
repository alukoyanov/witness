export default interface IPipe
{
    handle(): () => any;
}