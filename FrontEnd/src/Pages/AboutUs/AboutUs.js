import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import NavComp from "../../Components/NavBar/NavBar";

const { Title, Paragraph, } = Typography;

export default function AboutUs() {
  const { section } = useParams();
  return (
    <div style={{fontFamily:'IRANSans'}}>
            <Title text={'درباه ما'}/>

      <Header />
      <NavComp sticky={true} />
      {section === "termsandrules" && (
        <Typography className="mt-5">
          <Title>شرایط و قوانین استفاده از سرویس‌ها و خدمات سبز لرن</Title>
          <Paragraph className="fs-3">
            کاربر گرامی لطفاً موارد زیر را جهت استفاده بهینه از خدمات و
            برنامه‌‏های کاربردی آکادمی سبز لرن با دقت ملاحظه فرمایید.ورود
            کاربران به وب‏‌سایت آکادمی سبز لرن هنگام استفاده از پروفایل شخصی،
            طرح‏‌های تشویقی، ویدئوهای رسانه تصویری آکادمی سبز لرن و سایر خدمات
            ارائه شده توسط آکادمی سبز لرن به معنای آگاه بودن و پذیرفتن شرایط و
            قوانین و همچنین نحوه استفاده از سرویس‌‏ها و خدمات آکادمی سبز لرن
            است. توجه داشته باشید که ثبت سفارش نیز در هر زمان به معنی پذیرفتن
            کامل کلیه شرایط و قوانین آکادمی سبز لرن از سوی کاربر است. لازم به
            ذکر است شرایط و قوانین مندرج، جایگزین کلیه توافق‏‌های قبلی محسوب
            می‏‌شود.
          </Paragraph>

          <Title level={2}>شرایط عودت وجه به دانشجو</Title>
          <Paragraph className="fs-3">
            از آنجایی که سبزلرن یک اکادمی خصوصی در زمینه آموزش برنامه نویسی و
            شبکه و امنیت است. تلاش میکند تا با مدرسین خود. طبق یک قرارداد رسمی و
            امضا شده بین طرفین. دوره های خود را بر روی این پلتفرم منتشر کند!
            مدرسینی که در سبزلرن مشغول فعالیت هستند. افرادی با تجربه و باران
            دیده به حساب می آیند. چرا که سبزلرن با مدرسینی همکاری میکند که حداقل
            ۲ سال تجربه مفید و تجربه تدریس قبلی را داشته باشند. لذا اگر مدرسی بر
            خلاف قرارداد طرفین پیش رود و برای دوره خود پشتیبانی ارائه ندهد.
            سبزلرن موظف است که در اولین فرصت. مدرس دوره را تغییر دهد و اگر قرار
            باشد پروسه تغییر مدرس دوره کمی طول بکشد. سبزلرن موظف است که کمک
            پشتیبان هایی که در آن زمینه تخصص دارند را استخدام کند تا دانشجو در
            پروسه یادگیری. دچار اختلال نشود ! و از سمت و سویی دیگر. سبزلرن حداقل
            ۱۰ الی ۳۰ درصد محتوای دوره های خود را جهت ارزیابی بهتر رایگان میکند
            تا دانشجو بتواند با ارزیابی بهتر در دوره مورد نظر ثبت نام کند. اگر
            چنانچه دانشجو. پس از یک هفته
          </Paragraph>
          <Paragraph className="fs-3">
            <ul>
              <li>من به این پول نیاز دارم و مشکل مالی دارم</li>

              <li>من از این دوره خوشم نمی آید و میخواهم پولم را پس بگیرم</li>
              <li>من تغییر حوزه داده ام و نیازی به این آموزش ندارم</li>
              <li>
                من در فلانجا قرار شد به عنوان کار اموز پذیرفته شوم و آنها قرار
                است به من مهارت جدیدی بیاموزند
              </li>
              <li>و… از این قبیل</li>
            </ul>
          </Paragraph>

          <Paragraph className="fs-3">
            مراجعه کند. مجموعه سبزلرن موظف نیست که مبلغ را به دانشجو عودت دهد.
            چرا که از قبل از طریق بخش نظرات و رایگان کردن بخش قابل توجهی از
            دوره. بستری برای برسی بهتر را فراهم کرده است و مسئولیت تغییر شرایط
            کاربر. طبق عرف به عهده خودش میباشد
          </Paragraph>
          <Title level={3}>
            سبزلرن موظف است در شرایطی هزینه دانشجو را عودت دهد که…
          </Title>
          <Paragraph className="fs-3">
            <ul>
              <li>
                دوره هیچ پشتیبانی را نداشته باشد و سبزلرن اقدامی برای احیای
                پشتیبانی نکند!
              </li>
              <li>
                محتوای دوره بروز نباشد و سبزلرن اقدامی برای بروزرسانی و بهبود
                دوره انجام ندهد
              </li>
              <li>
                مدرس به وعده های داده شده از نظر محتوا و کیفت ویدیو عمل نکند‌.
              </li>
              <li>
                دوره تاخیر بیش از حد داشته باشد و مدرس دائم بهانه های متفاوت
                برای نرسیدن اپدیت ها بیاورد
              </li>
            </ul>
          </Paragraph>
          <Paragraph className="fs-3">
            و در صورت بودن موارد ذکر شده. سبزلرن موظف است که ۱۰۰ درصد مبلغ را به
            کیف پول و یا حساب بانکی کاربر با ۵ الی ۱۰ درصد خسارت بیشتر عودت
            دهد!(یعنی علاوه بر هزینه کل. ۱۰ درصد خسارت بیشتر هم به کاربر پرداخت
            میشود)
          </Paragraph>
   
        </Typography>
      )}
      {section === "contactus" && (
        <Typography  className="mt-5">
          <Title>ارتباط با ما</Title>
          <Paragraph className="fs-3">
          برای ارتباط با مدیریت و یا پشتیبانی عمومی و فنی. میتوانید از طریق وارد شدن به اکانت کاربری  بخش تیکت های پشتیبانی و انتخاب دپارتمان مورد نظر. اقدام کنید
          </Paragraph>

          <Title level={3}>ساعت کاری</Title>
          <Paragraph className="fs-3">
          شنبه تا پنجشنبه / از ساعت ۷ صبح تا ۱۰ شب
          </Paragraph>
     
   
        </Typography>
      )}
      <Footer />
    </div>
  );
}
