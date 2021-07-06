//when we are typing inside the text editor we wwant to update the db live, we will wait for few seconds before we update the db
export default function debounce(a,b,c){
  var d,e;
  return function(){
    function h(){
      d=null;
      c||(e=a.apply(f,g));
    }
    var f=this,g=arguments;
    return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
  }
}
  
//the notes will be in the form of html tags we just remove the <> tags before writing on editor or the left sidebar
export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
};